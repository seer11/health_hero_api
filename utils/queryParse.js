exports.mergeParse = (query) => {
  let merge = {};
  for (const attr in query) {
    if (/mergeLocal/.test(attr)) {
      merge = merge || {};
      const key = attr.slice(10);
      merge[[query[`merge${key}`]]] = [
        query[`mergeRemote${key}`],
        query[`mergeLocal${key}`],
        query[`mergeAs${key}`],
        query[`mergeOne${key}`],
        query[`mergeFilterBy${key}`], // apply a key filter to the $lookup aggregation, require `mergeFilter`
        query[`mergeFilter${key}`], // apply a key filter to the $lookup aggregation, require `mergeFilterBy`
        query[`mergeAsCount${key}`], // output as $size, count the total records of this merge to query projection

        /**
         * useable keys are: max,min,avg,first,last,sum
         */
        query[`mergeAsGroup${key}`], // output as custom grouping in the $group staging
        query[`mergeAsGroupKey${key}`], // output as custom grouping in the $group staging, this the key parameter to target
      ];
    }
  }
  return merge;
};
