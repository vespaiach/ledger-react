export type EventMap<T extends EventTarget> = T extends MediaQueryList
  ? MediaQueryListEventMap
  : T extends Document
  ? DocumentEventMap
  : T extends Window
  ? WindowEventMap
  : HTMLElementEventMap;
type EventTypes<T extends EventTarget> = keyof EventMap<T> & string;

export function listenTo<T extends EventTarget, K extends EventTypes<T>>(
  element: T,
  type: K,
  listener: { (this: T, ev: Event): void },
  opts?: AddEventListenerOptions | boolean
): () => void {
  element.addEventListener(type, listener, opts);
  return element.removeEventListener.bind(element, type, listener, opts);
}
