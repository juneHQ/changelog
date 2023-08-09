import { Avatar, Flex, HStack, Text, Tooltip } from "@chakra-ui/react";

interface ContributorProps {
  avatarUrl?: string;
  name: string;
  description: string;
  hideNames?: boolean;
}

export function Contributor(props: ContributorProps) {
  return (
    <HStack spacing={4}>
      {!!props.avatarUrl && (
        <Tooltip label={props.name}>
          <Avatar src={props.avatarUrl} />
        </Tooltip>
      )}
      {!props.hideNames && (
        <Flex direction="column" align="flex-start" justify="center">
          <Text fontWeight="semibold">{props.name}</Text>
          <Text color="rgba(36,31,71,0.8)">{props.description}</Text>
        </Flex>
      )}
    </HStack>
  );
}
