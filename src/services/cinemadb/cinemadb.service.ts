// Initializes the `cinemadb` service on path `/cinemadb`
import createService from 'feathers-sequelize';
import createModel from '../../models/cinemadb.model';
import hooks from './cinemadb.hooks';
import filters from './cinemadb.filters';

export default () => {
  const app: any = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'cinemadb',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/cinemadb', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('cinemadb');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
