export function formatDate(time){
    const date = new Date(time);

    const minutes = date.getMinutes().toString()
        .padStart(2, "0");
        const tempHours = date.getHours() + 3;
    const hours = tempHours.toString()
        .padStart(2, "0");
    const day = date.getDate().toString()
        .padStart(2, "0");
    let month = date.getMonth()
    const year = date.getFullYear();

   month = (month + 1).toString()
   .padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`
}

