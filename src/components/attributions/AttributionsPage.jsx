import React from "react";

const attributions = [
  { href: "https://www.flaticon.com/free-icons/facebook", text: "Facebook icon created by Freepik - Flaticon" },
  { href: "https://www.flaticon.com/free-icons/facebook", text: "Facebook Messenger icon created by Pixel perfect - Flaticon" },
  { href: "https://www.flaticon.com/free-icons/icq", text: "Icq icon created by Pixel perfect - Flaticon" },
  { href: "https://www.flaticon.com/free-icons/instagram", text: "Instagram icon created by cobynecz - Flaticon" },
  { href: "https://www.flaticon.com/free-icons/linkedin", text: "Linkedin icon created by riajulislam - Flaticon" },
  { href: "https://www.flaticon.com/free-icons/msn", text: "Msn icon created by Pixel perfect - Flaticon" },
  { href: "https://www.flaticon.com/free-icons/microsoft", text: "Microsoft icon created by Freepik - Flaticon" },
  { href: "https://www.flaticon.com/free-icons/myspace", text: "Myspace icon created by Md Tanvirul Haque - Flaticon" },
  { href: "https://www.flaticon.com/free-icons/brands-and-logotypes", text: "Pinterest icon created by Freepik - Flaticon" },
  { href: "https://www.flaticon.com/free-icons/reddit", text: "Reddit icon created by Freepik - Flaticon" },
  { href: "https://www.flaticon.com/free-icons/snapchat", text: "Snapchat icon created by cobynecz - Flaticon" },
  { href: "https://www.flaticon.com/free-icons/telegram", text: "Telegram icon created by Pixel perfect - Flaticon" },
  { href: "https://www.flaticon.com/free-icons/tiktok", text: "Tiktok icon created by cobynecz - Flaticon" },
  { href: "https://www.flaticon.com/free-icons/whatsapp", text: "Whatsapp icon created by Pixel perfect - Flaticon" },
  { href: "https://www.flaticon.com/free-icons/tweet", text: "x/Twitter icon created by Freepik - Flaticon" },
  { href: "https://www.flaticon.com/free-icons/youtube", text: "Youtube icon created by Freepik - Flaticon" },
];

export default function AttributionsPage() {
  return (
    <main style={{ padding: "2rem", margin: "0 auto" }}>
      <h1>Icon Attributions</h1>
      <ul>
        {attributions.map((attr, idx) => (
          <li key={idx}>
            <a href={attr.href} target="_blank" rel="noopener noreferrer">{attr.text}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}