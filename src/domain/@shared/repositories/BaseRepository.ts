export default interface BaseRepository<T> {
	create(entity: T): Promise<void>;
}
