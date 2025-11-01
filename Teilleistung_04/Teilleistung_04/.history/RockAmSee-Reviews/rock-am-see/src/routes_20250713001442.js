import Home from './Home.svelte';
import Form from './Form.svelte';
import ReviewDetail from './ReviewDetail.svelte';

const routes = {
  '/': Home,
  '/form': Form,
  '/review/:id': ReviewDetail,
};

export default routes;
