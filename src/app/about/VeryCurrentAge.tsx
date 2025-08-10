"use client";

import React from "react";

const bornIn = new Date(2006, 5, 10, 7, 5, 0);

export default function VeryCurrentAge() {
  const [, setExec] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setExec((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const age = new Date().getFullYear() - bornIn.getFullYear();
  const monthDiff = new Date().getMonth() - bornIn.getMonth();
  const dayDiff = new Date().getDate() - bornIn.getDate();
  const hourDiff = new Date().getHours() - bornIn.getHours();
  const minuteDiff = new Date().getMinutes() - bornIn.getMinutes();
  const secondDiff = new Date().getSeconds() - bornIn.getSeconds();

  return (
    <>
      {" "}
      {age} anos, {monthDiff} {monthDiff === 1 ? "mês" : "meses"} e {dayDiff}{" "}
      {dayDiff === 1 ? "dia" : "dias"}, {hourDiff} {hourDiff === 1 ? "hora" : "horas"}, {minuteDiff}{" "}
      {minuteDiff === 1 ? "minuto" : "minutos"}, {secondDiff}{" "}
      {secondDiff === 1 ? "segundo" : "segundos"}
    </>
  );
}
