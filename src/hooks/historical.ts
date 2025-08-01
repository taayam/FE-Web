import { useEffect, useState, useCallback } from "react";
import { database } from "../config/config";
import { ref, query, orderByKey, onValue, limitToLast } from "firebase/database";

interface SensorData {
  tanggal: string;
  nilai: number;
}

const useFirebasedata = () => {
//   const [latestCahaya, setLatestCahaya] = useState<SensorData | null>(null);
    const [latestkelembaban, setLatestkelembaban] = useState<SensorData[] | null>(null);
    const [latestSuhuKandang, setLatestSuhuKandang] = useState<SensorData[] | null>(null);  

  const fetchHistoricalData = useCallback((sensorPath: string, setState: React.Dispatch<React.SetStateAction<SensorData[] | null>>) => {
    const sensorRef = query(ref(database, `IoT/${sensorPath}`), orderByKey(), limitToLast(1008));
    return onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        const data  = Object.entries(snapshot.val()).map(([tanggal, nilai]) => ({
          tanggal,
          nilai: nilai as number,
        }
    ));
        setState(data); // Ambil data historical
      }
      else {
        setState(null); // Jika tidak ada data, set null
      }
    });
  }, []);

  useEffect(() => {
    // const unsubCahaya = fetchHistoricalData("Cahaya", setLatestCahaya);
    const unsubkelembaban = fetchHistoricalData("kelembaban", setLatestkelembaban);
    const unsubSuhu = fetchHistoricalData("suhu", setLatestSuhuKandang);
  
    return () => {
    //   unsubCahaya();
      unsubkelembaban();
      unsubSuhu();
      
    };
  }, [fetchHistoricalData]);
  return { latestSuhuKandang ,latestkelembaban};

//   return { latestCahaya, latestkelembaban, latestSuhuKandang };
};

export default useFirebasedata;
