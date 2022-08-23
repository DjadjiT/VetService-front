import DateTimeFormatOptions = Intl.DateTimeFormatOptions;

export class DateService {
 static formatDateLocaleDateString(date: Date): string{
   const options : DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric"};
   let str = date.toLocaleDateString(undefined, options)
   return str[0].toUpperCase() + str.slice(1)
 }

  static formatDateLocaleDateStringWithoutHours(date: Date): string{
    const options : DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    let str = date.toLocaleDateString(undefined, options)
    return str[0].toUpperCase() + str.slice(1)
  }
}
