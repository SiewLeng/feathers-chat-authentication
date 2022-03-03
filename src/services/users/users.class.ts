import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Params } from "@feathersjs/feathers";
import { Application } from '../../declarations';
import services from '..';

type findParamsType = {
  query: {
    email: string
  }
}

export class Users extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  create(data: any, params: Params) {
    data.createdBy = data.id;
    data.updatedBy = data.id;
    return super.create(data, params);
  }

  get(id: string, params: Params) {
    return super.get(id, params);
  }

}
