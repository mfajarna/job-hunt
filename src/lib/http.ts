import baseService from './base-service';

export async function actionSignup(args: any): Promise<void> {
  return baseService({
    path: '/user',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    bodyReq: args,
  }).then((response) => response.data);
}

export async function getJobCategories(): Promise<void> {
  return baseService({
    path: '/job/categories',
    method: 'GET',
  }).then((response) => response);
}

export async function getJobFeatured(): Promise<void> {
  return baseService({
    path: '/job/featured',
    method: 'GET',
  }).then((response) => response);
}

export async function getLocation(): Promise<void> {
  return baseService({
    path: '/location',
    method: 'GET',
  }).then((response) => response);
}

export async function getFilterWordsJob(words: string): Promise<void> {
  return baseService({
    path: `/job/filter/filter-contain?name=${words}`,
    method: 'GET',
  }).then((response) => response);
}

export async function applyJob(args: any): Promise<void> {
  return baseService({
    path: '/job/apply',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    bodyReq: args,
  });
}
