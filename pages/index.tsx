import Head from "next/head";
import { useEffect, useState } from "react";

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import 'dayjs/locale/nb';

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isoWeek);

export default function Home() {

  const [apiDate, setApiDate] = useState<string | null>(null)
  const [dateNow, setDateNow] = useState<string | null>(null)

  const handleClick =  () => {
    try {
      fetch('/api/get-date')
        .then(response => response.json())
        .then(data => setApiDate(data.date))

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const now = dayjs().tz("Europe/Oslo")
    console.log(now.toDate().toString())
    setDateNow(now.toDate().toString())
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1>Date time error</h1>
        <p><strong>Date on render time (Europe/Oslo):</strong> {dateNow}</p>
        <button onClick={handleClick}>Get date from api</button>
        <p><strong>Fetched date:</strong> {apiDate}</p>
      </main>
    </>
  );
}
