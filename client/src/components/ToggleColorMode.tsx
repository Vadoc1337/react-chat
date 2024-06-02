import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
const ToggleColorMode = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Button
            onClick={() => toggleColorMode()}
            pos="absolute"
            display="flex"
            borderRadius="50%"
            w="5"
            top="0"
            right="1"
            m="1rem"
            size="md"
        >
            {colorMode === "dark" ? (
                <SunIcon color="orange.200" />
            ) : (
                <MoonIcon color="blue.700" />
            )}
        </Button>
    );
};

export default ToggleColorMode;
