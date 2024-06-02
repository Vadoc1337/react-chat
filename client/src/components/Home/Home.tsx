import {Grid, GridItem, Tabs} from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import useSocketSetup from "../../hooks/useSocketSetup";
import {FormEventHandler, useState} from "react";
import {useSelector} from "react-redux";
import {selectColleague} from "../../redux/slices/colleagueListSlice";


const Home = () => {
    useSocketSetup()
    const [colleagueIndex,setColleagueIndex] = useState(0);
    const handleTabChange: FormEventHandler<HTMLDivElement> = (event) => {
        const index = parseInt(event.currentTarget.id);
        setColleagueIndex(index);
    }
    const colleagueList = useSelector(selectColleague);

    return (

        <Grid
            templateColumns="repeat(10,1fr)"
            h="100vh"
            as={Tabs}
            onChange={handleTabChange}
        >
            <GridItem colSpan={3} borderRight="1px solid gray">
                <Sidebar/>
            </GridItem>
            <GridItem colSpan={7}
                      h="100vh"
                      pt="64px"
            >
                <Chat userid={colleagueList[colleagueIndex]?.userid}/>
            </GridItem>
        </Grid>
    );
};
// TODO подправить стили
export default Home;
