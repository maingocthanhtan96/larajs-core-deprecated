import { onUnmounted } from 'vue';
import axios from 'axios';

export function useCancelToken() {
  const source = axios.CancelToken.source();

  onUnmounted(() => {
    source.cancel('Fetch cancelled');
  });

  return source.token;
}
