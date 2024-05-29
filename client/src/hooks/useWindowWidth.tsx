import React from "react";
import debounce from "lodash.debounce";

const useWindowWidth = () => {
    const [width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const handleResize = debounce(() => {
            setWidth(window.innerWidth);
        }, 60);

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return width;
};

export default useWindowWidth;
