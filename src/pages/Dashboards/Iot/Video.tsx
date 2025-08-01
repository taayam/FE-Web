import React from "react";
import BreadCrumb from "Common/BreadCrumb";
import Plyr, { APITypes } from "plyr-react";
import "plyr-react/plyr.css";

const videoId = "qYgogv4R8zg";
const provider = "youtube";

const VideoPlayer = () => {
    const ref = React.useRef<APITypes>(null);

    const plyrVideo =
        videoId && provider ? (
            <Plyr
                ref={ref}
                source={{
                    type: "video",
                    sources: [
                        {
                            src: `https://www.youtube.com/embed/${videoId}`,
                            provider: provider,
                        },
                    ],
                }}
            />
        ) : null;

    return (

                <div className="order-7 md:col-span-4 lg:col-span-4 col-span-12">
                        <div className="card-body">
                            <h6 className="mb-4 text-gray-800 text-15 dark:text-white">CCTV Kandang Ayam</h6>
                            {plyrVideo}
                    </div>
                </div>
    );
};

export default VideoPlayer;

