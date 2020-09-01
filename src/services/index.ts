import cinemadb from './cinemadb/cinemadb.service'

export default () => {
  const app: any = this; // eslint-disable-line no-unused-vars
  app.configure(cinemadb)
};
