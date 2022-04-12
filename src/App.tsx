import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

interface ChatData {
  author?: string;
  date: string;
  chat?: string;
  continuous?: boolean;
}

class Row {
  type: string;
  content?: ChatData;

  constructor(type: string, content?: ChatData) {
    this.type = type;
    this.content = content;
  }
}

interface IEvent {
  keydown?: (this: Window, ev: KeyboardEvent) => any;
}

interface DateProps {
  date: string;
}

function DateRender(props: DateProps) {
  return (
    <div className="dateHr">
      <hr></hr>
      <div className="dateView">
        <div className="dateText">{props.date}</div>
      </div>
    </div>
  );
}

interface TalkProps {
  author: string;
  date: string;
  chat: string;
  start: boolean;
  end: boolean;
}

function TalkOther(props: TalkProps) {
  return (
    <div className="talkOther">
      {props.start ? <div className="talkAuthor">{props.author}</div> : null}
      <div className="talkWrapper">
        <div className="talkChat">{props.chat}</div>
        {props.end ? <div className="talkDate">{props.date}</div> : null}
      </div>
    </div>
  );
}

function Talk(props: TalkProps) {
  return (
    <div className="talk">
      <div className="talkWrapper">
        {props.end ? <div className="talkDate">{props.date}</div> : null}
        <div className="talkChat">{props.chat}</div>
      </div>
    </div>
  );
}

interface RowProps {
  row: Row;
  rows: Row[];
  rowIndex: number;
  me: string;
}

function RenderRow(props: RowProps) {
  let isDate = props.row.type === "date";

  if (isDate && props.row.content) {
    return <DateRender date={props.row.content.date} />;
  } else {
    let isOwn = false;

    let isStart = false;
    let isEnd = false;

    if (props.row.content?.author === props.me) {
      isOwn = true;
    }

    if (props.rowIndex === 0) {
      isStart = true;
    } else if (
      props.rows[props.rowIndex - 1].content?.author ===
        props.row.content?.author &&
      props.rows[props.rowIndex - 1].content?.date === props.row.content?.date
    ) {
      isStart = false;
    } else {
      isStart = true;
    }

    if (props.rowIndex === props.rows.length - 1) {
      isEnd = true;
    } else if (
      props.rows[props.rowIndex + 1].content?.author ===
        props.row.content?.author &&
      props.rows[props.rowIndex + 1].content?.date === props.row.content?.date
    ) {
      isEnd = false;
    } else {
      isEnd = true;
    }

    if (
      isOwn &&
      props.row.content &&
      props.row.content.author &&
      props.row.content.chat
    ) {
      return (
        <Talk
          author={props.row.content?.author}
          date={props.row.content?.date}
          chat={props.row.content?.chat}
          start={isStart}
          end={isEnd}
        />
      );
    } else if (
      !isOwn &&
      props.row.content &&
      props.row.content.author &&
      props.row.content.chat
    ) {
      return (
        <TalkOther
          author={props.row.content?.author}
          date={props.row.content?.date}
          chat={props.row.content?.chat}
          start={isStart}
          end={isEnd}
        />
      );
    }
  }

  return <div>Failed to Render</div>;
}

function App() {
  const [text, setText] = useState("");
  const [oldText, setOldText] = useState("");

  const [rows, setRows] = useState([] as Row[]);
  const [me, setMe] = useState("");

  const [events, setEvents] = useState({} as IEvent);

  useEffect(() => {
    setMe("하재란");

    if (events.keydown) {
      window.removeEventListener("keydown", events.keydown);
    }

    const keydown = (e: KeyboardEvent) => {
      if (e.key === "8") {
        const input = prompt("Input");

        if (input !== null) {
          setText(input);
        }
      } else if (e.key === "9") {
        const input = prompt("Input");

        if (input !== null) {
          setOldText(input);
        }
      }
    };

    setEvents({
      keydown,
    });

    window.addEventListener("keydown", keydown);
  }, []);

  useEffect(() => {
    const lines = text.split("\n");
    const nrows: Row[] = [];

    for (const line of lines) {
      if (line.startsWith("-")) {
        const row = new Row("date", {
          date: line.replaceAll("-", "").trim(),
        });

        nrows.push(row);
      } else if (line.startsWith("[")) {
        const splices = line.split("]");
        splices[0] = splices[0].slice(1);
        splices[1] = splices[1].replaceAll("[", "");
        splices[2] = splices[2].replaceAll("\r", "");

        nrows.push(
          new Row("chat", {
            author: splices[0],
            date: splices[1],
            chat: splices[2],
          })
        );
      }
    }

    setRows(nrows);
  }, [text]);

  useEffect(() => {
    const lines = oldText.split("2021");
    const nrows: Row[] = [];

    if (lines.length > 1) {
      let prevDate = "";
      let pprevDate = "";

      const dayInfo = ["목", "금", "토", "일", "월", "화", "수"];
      let index = 0;
      let count = lines.length;

      for (const line of lines) {
        if (index % 100 === 0) {
          console.log(`${index} / ${count}`);
        }
        index++;
        if (line === "") {
          continue;
        }
        if (prevDate !== pprevDate) {
          const drow = new Row("date", {
            date: prevDate,
          });

          pprevDate = prevDate;

          nrows.push(drow);
        }

        try {
          const split = line.split(",");

          const time = ("2021" + split[0]).trim();
          const authorChat = split[1];

          console.log(time);
          console.log(authorChat);
          const atSplit = authorChat.split(":");
          const author = atSplit[0].trim();
          const chat = "".concat(...atSplit.slice(1)).trim();

          // 2021-5-20T1:59:00,
          //new Date("2020-03-26T13:30:00");

          let splited = time.split("년");
          const year = parseInt(splited[0]);

          splited = splited[1].split("월");
          const month = parseInt(splited[0]);

          splited = splited[1].split("일");
          const day = parseInt(splited[0]);

          const dateInstance = new Date(year, month, day);

          const date = `${year}년 ${month}월 ${day}일 ${
            dayInfo[dateInstance.getDay()]
          }요일`;
          prevDate = date;

          let hourPrefixStr = "오전";

          if (splited[1].includes("오후")) {
            hourPrefixStr = "오후";
          }

          splited = splited[1]
            .replace("오전", "")
            .replace("오후", "")
            .trim()
            .split(":");

          const hour = splited[0];
          const minute = splited[1];

          const nrow = new Row("chat", {
            author: author,
            chat: chat,
            date: `${hourPrefixStr} ${hour}:${minute}`,
          });

          nrows.push(nrow);
        } catch {
          console.log(`Error -> ${line}`);
        }
      }

      setRows(nrows);
    }
  }, [oldText]);

  return (
    <div className="App">
      {rows.map((row, ind, rows) => (
        <RenderRow row={row} rows={rows} rowIndex={ind} me={me} />
      ))}
    </div>
  );
}

export default App;
