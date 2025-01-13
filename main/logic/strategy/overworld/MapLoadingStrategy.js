class MapLoadingStrategy {
    loadMap(mapFile) {
        throw new Error("This method must be overridden by a subclass");
    }
}

export default MapLoadingStrategy