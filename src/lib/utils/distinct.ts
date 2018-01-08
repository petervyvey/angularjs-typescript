
export function distinct<TSource, TResult>(array: TSource[], propertyOf: (x: TSource) => TResult): TSource[] {
    const $array = array.filter((loc, index) => {
        return array.findIndex(l => propertyOf(l) === propertyOf(loc)) === index;
    });

    return $array;
}
