import { Contributor } from 'components/core/contributor';
import { Divider, VStack } from '@chakra-ui/react';

export const Contributors = ({authors}) => {
  return <>
  <Divider mt={16} mb={8} />
  <VStack px={[6]} align="start" spacing={4}>
    {authors.map((author) => (
      <Contributor key={author.name} {...author} />
    ))}
  </VStack>
</>;
};