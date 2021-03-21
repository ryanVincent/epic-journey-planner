import { Waypoint } from "../state/waypoints";

export const downloadFile = (data, fileName, type = "text/plain") => {
  // Create an invisible A element
  const a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);

  // Set the HREF to a Blob representation of the data to be downloaded
  a.href = window.URL.createObjectURL(new Blob([data], { type }));

  a.setAttribute("download", fileName);
  a.click();

  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
};

export const getGPX = (name: string, waypoints: Waypoint[]) => {
  return `<gpx>
    <trk>
      <name>${name}</name>
      <trkseg>
        ${waypoints.map((waypoint) => seg(waypoint.lat, waypoint.lng))}
      </trkseg>
    </trk>
  </gpx>`;
};

const seg = (
  lat: number,
  long: number,
  elevation?: number
) => `<trkpt lat="${lat}" lon="${long}">
${elevation ? `<ele>${elevation}</ele>` : ""}
</trkpt>`;
