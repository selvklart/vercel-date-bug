import dayjs, {Dayjs} from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import 'dayjs/locale/nb';

dayjs.locale('nb');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek);
dayjs.tz.setDefault('Europe/Oslo');

export {Dayjs};

export default dayjs;
