import { Avatar, Flex, HStack, Text } from '@chakra-ui/react';
export function Contributor(props) {
    return (<HStack spacing={4}>
      {!!props.avatarUrl && <Avatar src={props.avatarUrl}/>}
      <Flex direction="column" align="flex-start" justify="center">
        <Text fontWeight="semibold">{props.name}</Text>
        <Text color="rgba(36,31,71,0.8)">{props.description}</Text>
      </Flex>
    </HStack>);
}
