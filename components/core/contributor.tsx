import { Avatar, Flex, HStack, Text } from '@chakra-ui/react';

interface ContributorProps {
  avatarUrl?: string;
  name: string;
  description: string;
}

export function Contributor({
  avatarUrl,
  name,
  description,
}: ContributorProps) {
  return (
    <HStack spacing={4}>
      {!!avatarUrl && <Avatar src={avatarUrl} />}
      <Flex direction="column" align="flex-start" justify="center">
        <Text fontWeight="semibold">{name}</Text>
        <Text color="gray.700">{description}</Text>
      </Flex>
    </HStack>
  );
}
