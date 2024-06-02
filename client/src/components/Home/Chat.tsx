import {TabPanel, TabPanels, Text, VStack} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {selectColleague} from "../../redux/slices/colleagueListSlice";
import {selectMessage} from "../../redux/slices/messagesSlice";
import {IChatProps} from "../../../client_declarations";
import ChatBox from "./ChatBox";
import {FC, useEffect} from "react";

const Chat: FC<IChatProps> = ({userid}) => {
    const messageArr = useSelector(selectMessage);
    const colleagueList = useSelector(selectColleague);
    const scrollFunc = () => {
        const bottomDiv = document.querySelector(`#bottom`);
        if (bottomDiv) {
            bottomDiv?.scrollIntoView();
        }
    };

    useEffect(() => {
        scrollFunc()
    }, [messageArr])
    return (
        colleagueList.length > 0 ? ( // подправил тут был просто colleague
            <VStack h="100%" justify="end">
                <TabPanels overflowY="auto" >
                    {colleagueList.map((colleague) => (
                        <VStack
                            flexDir="column-reverse"
                            as={TabPanel}
                            key={`chat:${colleague.username}`}
                            w="100%"
                            mt="6px">
                            <div id="bottom" style={{visibility: "hidden"}}/>
                            {messageArr.filter

                            (message => message.to === colleague.userid || message.from === colleague.userid)
                                .map((msg, index) => (
                                    <Text
                                        m={
                                            msg.to === colleague.userid
                                                ? "0 0 0 auto !important"
                                                : "0 auto 0 0 !important"
                                        }
                                        maxW={["95%", "45%", "45%"]}
                                        minW="20px"
                                        key={`msg:${colleague.username}.${index}`}
                                        fontSize="1em"
                                        bg={msg.to === colleague.userid ? "blue.100" : "gray.100"}
                                        color="gray.800"
                                        borderRadius="10px"
                                        p="0.5rem 1rem"
                                        wordBreak="break-word"
                                        whiteSpace="pre-wrap"
                                        visibility="visible"
                                    >
                                        {(msg.text)}
                                    </Text>
                                ))}
                        </VStack>
                    ))}
                </TabPanels>
                <ChatBox userid={userid}/>
            </VStack>) : (
            <VStack h="100%" justify="center" pt="5rem" textAlign="center"
                    fontSize="lg">
                <TabPanels overflowY="scroll">
                    <TabPanel>
                        <Text>Добавьте коллег чтобы начать общение</Text>
                    </TabPanel>
                </TabPanels>
            </VStack>)
    );
};

export default Chat;
