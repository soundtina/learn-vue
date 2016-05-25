let ShortestRange = -1;
import _ from 'lodash';
module.exports = (list) => {
    list = _.cloneDeep(list);
    console.log(list);
    console.log(ShortestRange);
}
