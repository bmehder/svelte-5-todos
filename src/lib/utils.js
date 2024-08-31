export const preventDefault = fn => event => {
	event.preventDefault()
	fn.call(this, event)
}
