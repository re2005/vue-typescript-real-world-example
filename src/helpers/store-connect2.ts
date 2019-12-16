function connectToCustomerStore(propName: Array<string>) {
    return propName.reduce((connectors: any, propName) => {
        return {
            ...connectors,
            [propName]: {
                get(): any {
                    // @ts-ignore
                    return this.$store.state.intake[propName];
                },
                set(newValue: string): void {
                    const updateObject = _getCustomerObjectToSet(newValue, propName);
                    // @ts-ignore
                    this.$store.commit('intake/updateState', updateObject);
                }
            }
        };
    }, {});
}

function _getCustomerObjectToSet(newValue: string, propName: string): object {
    return {
        [propName]: newValue
    };
}

const StoreHelpers = {
    connectToCustomerStore
};
export default StoreHelpers;
