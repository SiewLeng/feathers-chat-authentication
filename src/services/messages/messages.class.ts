import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { Params } from "@feathersjs/feathers";

export class Messages extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  find(params: Params) {
    const num = params.query ?  parseInt(params.query.num) : 0
    return this.findLastMessgaes(num);
  }

  findLastMessgaes(num: number) {
    return new Promise<any[]>((resolve, reject) => {
      super.Model.aggregate([
        { $sort : { createdAt : -1 } },
        { $limit: num },
        { $sort : { createdAt : 1 } },
      ]).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    })
  }

  setup(app: Application) {
    app = app;
  }

}
