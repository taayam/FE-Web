import { useEffect, useState, useCallback } from "react";
import { database } from "../config/config";
import { ref, query, orderByKey, onValue } from "firebase/database";

interface SensorData {
  tanggal: string;
  nilai: number;
}

const useFirebasedata = () => {
  const [latestCahaya, setLatestCahaya] = useState<SensorData | null>(null);
  const [latestkelembaban, setLatestkelembaban] = useState<SensorData | null>(null);
  const [latestSuhuKandang, setLatestSuhuKandang] = useState<SensorData | null>(null);

  const fetchLatestData = useCallback((sensorPath: string, setState: React.Dispatch<React.SetStateAction<SensorData | null>>) => {
    const sensorRef = query(ref(database, `IoT/${sensorPath}`), orderByKey());
    return onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.val()).map(([tanggal, nilai]) => ({
          tanggal,
          nilai: nilai as number,
        }));
        setState(data.reverse()[0]); // Ambil data terbaru
      }
    });
  }, []);

  useEffect(() => {
    const unsubCahaya = fetchLatestData("Cahaya", setLatestCahaya);
    const unsubkelembaban = fetchLatestData("kelembaban", setLatestkelembaban);
    const unsubSuhu = fetchLatestData("suhu", setLatestSuhuKandang);
  
    return () => {
      unsubCahaya();
      unsubkelembaban();
      unsubSuhu();
      
    };
  }, [fetchLatestData]);

  return { latestCahaya, latestkelembaban, latestSuhuKandang };
};

export default useFirebasedata;
