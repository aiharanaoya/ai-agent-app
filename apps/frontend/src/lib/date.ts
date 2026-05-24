import { addDays, format, parseISO, subDays } from 'date-fns';
import { enUS, ja } from 'date-fns/locale';

export const todayStr = (): string => format(new Date(), 'yyyy-MM-dd');

export const formatDateJa = (dateStr: string): string =>
	format(parseISO(dateStr), 'M月d日', { locale: ja });

export const formatDateEn = (dateStr: string): string =>
	format(parseISO(dateStr), 'MMM d, yyyy', { locale: enUS });

export const formatDayOfWeek = (dateStr: string): string =>
	format(parseISO(dateStr), 'EEEE', { locale: ja });

export const formatUpdatedTime = (isoStr: string): string =>
	format(parseISO(isoStr), 'HH:mm');

export const prevDate = (dateStr: string): string =>
	format(subDays(parseISO(dateStr), 1), 'yyyy-MM-dd');

export const nextDate = (dateStr: string): string =>
	format(addDays(parseISO(dateStr), 1), 'yyyy-MM-dd');

export const isToday = (dateStr: string): boolean => dateStr === todayStr();

export const isFuture = (dateStr: string): boolean => dateStr > todayStr();
