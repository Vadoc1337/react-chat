import {Divider, Heading, HStack, Tab, TabList, VStack, Text, Circle, useDisclosure, WrapItem, Wrap, Tabs} from "@chakra-ui/react";
import {Button} from "@chakra-ui/button";
import {AddIcon} from "@chakra-ui/icons";
import {selectColleague} from "../../redux/slices/colleagueListSlice";
import {useSelector} from "react-redux";
import AddColleagueModal from "./AddColleagueModal";
import useWindowWidth from "../../hooks/useWindowWidth";

const SideBar = () => {
    const colleagues = useSelector(selectColleague);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const windowWidth = useWindowWidth();
    return (
        <>
            <VStack py="12px">
                {windowWidth >= 585 ? (
                        <HStack w="100%" justify="space-between" px='10px'>
                            <Heading size="md">
                                Коллеги
                            </Heading>
                            <Button onClick={onOpen}>
                                <AddIcon/>
                            </Button>
                        </HStack>) :
                    (
                        <HStack w="90px">
                            <Button onClick={onOpen}>
                                <Text>Коллеги</Text>
                            </Button>
                        </HStack>)
                }
                <Divider/>
                <Tabs size="sm" variant="soft-rounded" colorScheme="blue" style={{cursor: 'pointer'}} >
                    <VStack as={TabList}>
                        {colleagues.length > 0 && colleagues.map(colleague => (
                            <Tab as={HStack} key={`colleague:${colleague.username}`} maxW={["96px", "130px", "300px"]}>
                                <Circle
                                    bg={"" + colleague.connected === "true" ? "green.500" : "red.500"}
                                    size="12px"
                                />
                                <Text maxW={["75px", "90px", "300px"]} style={{textWrap: 'pretty'}}>
                                    {colleague.username}
                                </Text>
                            </Tab>
                        ))}
                    </VStack>
                </Tabs>
            </VStack>
            <AddColleagueModal isOpen={isOpen} onClose={onClose}/>
        </>
    );
};

export default SideBar;