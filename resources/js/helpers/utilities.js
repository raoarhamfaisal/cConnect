import Swal from "sweetalert2";
export const changesSaved = (
  notificationMessage = "Changes Successfully Saved!"
) => {
  Swal.fire({
    background: "#E6F5E9",
    html: `<div class="flex items-center flex-col justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50"><path fill="#4B908C" d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17s-7.6 17-17 17zm0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.7-15-15-15z"/><path fill="#4B908C" d="m23 32.4l-8.7-8.7l1.4-1.4l7.3 7.3l11.3-11.3l1.4 1.4z"/></svg><div style="color:#4B908C; font-family: Inter, sans-serif; font-weight:normal;white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" class="text-sm pb-2">${notificationMessage}</div></div>`,
    // html: `<i class="fas fa-check fa-lg" style="color:#4B908C"></i> `,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    width: 300,
    height: 200,
    padding: 10,
  });
};

export const somethingWentWrong = (
  notificationMessage = "Sorry Something Went wrong"
) => {
  Swal.fire({
    background: "#fe5151",
    html: ` <div class="flex items-center flex-col justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="#fff" d="M11.001 10h2v5h-2zM11 16h2v2h-2z"/><path fill="#fff" d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19L12 5.137L19.344 19H4.661z"/></svg><div style="color:#fff; font-family: Inter, sans-serif; font-weight:normal;white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" class="text-sm pb-2">${notificationMessage}</div></div>`,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    padding: 10,
    width: 300,
  });
};

export function convertDateFormat(dateString) {
  // Create a new date object from the input string
  const date = new Date(dateString);

  // Extract the day, month, and year from the date object
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Note: Months are 0-based
  const year = date.getFullYear();

  // Return the desired format
  return `${day}/${month}/${year}`;
}
// import { changesSaved, somethingWentWrong } from "@/helpers/utilities"
