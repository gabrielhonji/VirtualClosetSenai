import { Progress, ProgressFilledTrack } from '@gluestack-ui/themed';

export default function Login() {
  return (
    <Progress value={100} w={300} size="md">
      <ProgressFilledTrack />
    </Progress>
  );
}