// スプレッドシートの公開URL
const publicSpreadsheetUrl =
    "https://docs.google.com/spreadsheets/d/1tVwWfzziioQH8mq1GR3Qp9be9rUQTgOjS2UE4_ZNZo8/pubhtml";

let allEvents = []; // 全イベントデータを保存

document.addEventListener("DOMContentLoaded", function () {
    const calendarEl = document.getElementById("calendar");
    if (!calendarEl) {
        console.error("カレンダー要素が見つかりません");
        return;
    }

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        locale: "ja",
        height: 600,
        events: [],
        eventContent: function (arg) {
            if (arg.event.extendedProps.eventCount) {
                return {
                    html: `<span>${arg.event.extendedProps.eventCount}件のイベント</span>`,
                };
            }
        },
        eventClick: function (info) {
            const event = info.event;
            const eventDetails = `
                <h3>${escapeHTML(event.title)}</h3>
                <p><strong>日付:</strong> ${escapeHTML(event.start.toISOString().split("T")[0])}</p>
                <p><strong>詳細:</strong> ${escapeHTML(event.extendedProps.description || "詳細なし")}</p>
            `;
            const eventList = document.getElementById("event-list");
            if (eventList) {
                eventList.innerHTML = eventDetails;
            }
        },
    });

    calendar.render();

    // スプレッドシートからデータを取得
    fetchEventsForCalendar(calendar);

    const filterButton = document.getElementById("filter-button");
    if (filterButton) {
        filterButton.addEventListener("click", function () {
            const dateFilter = document.getElementById("date-filter").value;
            const prefectureFilter = document.getElementById("prefecture-filter").value;
            console.log("フィルタリング条件:", { dateFilter, prefectureFilter });

            filterEvents(dateFilter, prefectureFilter, calendar);
        });
    }

    if (document.getElementById("date-filter")) {
        flatpickr("#date-filter", { dateFormat: "Y-m-d", locale: flatpickr.l10ns.ja });
    }
});

function fetchEventsForCalendar(calendar) {
    Tabletop.init({
        key: publicSpreadsheetUrl,
        callback: function (data) {
            console.log("スプレッドシートから取得したデータ:", data);
            allEvents = data.map((event) => ({
                date: event["日付"] || "",
                name: event["イベント名"] || "イベント名不明",
                prefecture: event["都道府県"] || "都道府県不明",
                location: event["場所"] || "場所不明",
                description: event["詳細"] || "説明なし",
            }));
            console.log("allEvents:", allEvents);
            const groupedEvents = groupEventsByDate(allEvents);
            Object.keys(groupedEvents).forEach((date) => {
                calendar.addEvent({
                    title: `${groupedEvents[date].length}件のイベント`,
                    start: date,
                    extendedProps: {
                        eventCount: groupedEvents[date].length,
                        description: "クリックして詳細を確認",
                    },
                });
            });
            renderEvents(allEvents);
        },
        simpleSheet: true,
        error: function (err) {
            console.error("スプレッドシートデータの取得に失敗しました:", err);
        },
    });
}

function groupEventsByDate(events) {
    return events.reduce((grouped, event) => {
        if (!grouped[event.date]) grouped[event.date] = [];
        grouped[event.date].push(event);
        return grouped;
    }, {});
}

function filterEvents(date, prefecture, calendar) {
    console.log("filterEvents が呼び出されました:", { date, prefecture });
    const filteredEvents = allEvents.filter((event) => {
        return (!date || event.date === date) && (!prefecture || event.prefecture === prefecture);
    });
    console.log("フィルタリング後のデータ:", filteredEvents);

    calendar.getEvents().forEach((event) => event.remove());
    const groupedEvents = groupEventsByDate(filteredEvents);
    Object.keys(groupedEvents).forEach((date) => {
        calendar.addEvent({
            title: `${groupedEvents[date].length}件のイベント`,
            start: date,
            extendedProps: { eventCount: groupedEvents[date].length },
        });
    });

    renderEvents(filteredEvents);
}

function renderEvents(events) {
    console.log("renderEvents が呼び出されました:", events);
    const eventList = document.getElementById("event-list");
    if (!eventList) {
        console.error("検索結果表示エリアが見つかりません");
        return;
    }
    eventList.innerHTML = "";

    events.forEach((event) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <h3>${escapeHTML(event.name)}</h3>
            <p>${escapeHTML(event.date)} - ${escapeHTML(event.prefecture)} (${escapeHTML(event.location)})</p>
            <p>${escapeHTML(event.description)}</p>
        `;
        eventList.appendChild(listItem);
    });
    console.log("検索結果リストが更新されました:", events);
}

function escapeHTML(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

