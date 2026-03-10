// src/lib/utils/dateFormatter.ts

function getTimezoneOffset(): number {
  return -new Date().getTimezoneOffset() / 60; // Retorna offset en horas
}

export function formatDateLikeFacebook(dateString: string): string {

  // convertir la fecha a utc-5


  // Parsear la fecha en formato MM-DD-YYYY HH:MM:SS
  const [datePart, timePart] = dateString.split(' ');
  const [month, day, year] = datePart.split('-');
  const [hours, minutes, seconds] = timePart.split(':');

  const postDate = new Date(
    parseInt(year),
    parseInt(month) - 1, // Los meses en JavaScript son 0-indexados
    parseInt(day),
    parseInt(hours),
    parseInt(minutes),
    parseInt(seconds)
  );

  const offset = getTimezoneOffset() * 60 * 60 * 1000;
  const postDateUTC = new Date(postDate.getTime() + offset);


  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - postDateUTC.getTime()) / 1000);

  // Si es en el futuro
  if (diffInSeconds < 0) {
    return 'coming soon'; // o puedes devolver la fecha completa
  }

  // Menos de un minuto
  if (diffInSeconds < 60) {
    return 'just now';
  }

  // Minutos
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  // Horas
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }

  // Días
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 3) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }

  // Si es más antigua, mostrar la fecha formateada
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  return new Intl.DateTimeFormat('en-EN', options).format(postDateUTC);
}