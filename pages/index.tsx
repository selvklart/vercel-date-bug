import Head from "next/head";
import { useEffect, useState } from "react";

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import 'dayjs/locale/nb';


dayjs.locale('nb');
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isoWeek);

export default function Home() {

  const [dayjsAPIDate, setDayjsAPIDate] = useState<string | null>(null)
  const [dayjsDateNow, setDayjsDateNow] = useState<string | null>(null)

  const [apiDate, setApiDate] = useState<string | null>(null)
  const [dateNow, setDateNow] = useState<string | null>(null)


  const handleClick =  () => {
    try {
      fetch('/api/get-date')
        .then(response => response.json())
        .then(data => {
          setDayjsAPIDate(data.dayjsDate)
          setApiDate(data.date)
        })

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    // Dayjs
    const now = dayjs().locale("nb-NO").tz("Europe/Oslo", true)
    setDayjsDateNow(now.toDate().toString())

    console.log(now.locale())

    // Date
    const date = new Date()
    setDateNow(date.toLocaleString("nb-NO", {timeZone: "Europe/Oslo"}))
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1>Date time bug</h1>
        <p><strong>Dayjs, Date on render time (Europe/Oslo):</strong> {dayjsDateNow}</p>
        <p><strong>Date, Date on render time (nb-NO):</strong> {dateNow}</p>
        <button onClick={handleClick}>Get date from api</button>
        <p><strong>Dayjs, Fetched date:</strong> {dayjsAPIDate}</p>
        <p><strong>Date, Fetched date:</strong> {apiDate}</p>
      </main>
    </>
  );
}
