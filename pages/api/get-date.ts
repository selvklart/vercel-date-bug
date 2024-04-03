import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.locale('nb');
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isoWeek);


import 'dayjs/locale/nb';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  date: string;
  dayjsDate: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

  const dayjsDateNow = dayjs().tz("Europe/Oslo").local()
  const dateNow = new Date()

  res.status(200).json({
    dayjsDate: dayjsDateNow.toDate().toLocaleString("nb-NO", {timeZone: "Europe/Oslo"}),
    date: dateNow.toLocaleString("nb-NO", {timeZone: "Europe/Oslo"}),
  });
}
