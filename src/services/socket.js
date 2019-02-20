import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

/**
 * Socket service.
 *
 * @export
 * @class SocketService
 */
export default class SocketService {
  /**
   * Call callback on call-list event is received.
   *
   * @static
   * @param {*} fn Callback
   * @returns
   * @memberof SocketService
   */
  static onCallList(fn) {
    return socket.on('call-list', fn);
  }

  /**
   * Call callback on new call is received.
   *
   * @static
   * @param {*} fn Callback
   * @returns
   * @memberof SocketService
   */
  static onCallAdded(fn) {
    return socket.on('call-init', fn);
  }

  /**
   * Call callback on call is ended.
   *
   * @static
   * @param {*} fn Callback
   * @returns
   * @memberof SocketService
   */
  static onCallRemoved(fn) {
    return socket.on('call-end', fn);
  }

  /**
   * Call callback on call is updated.
   *
   * @static
   * @param {*} fn Callback
   * @returns
   * @memberof SocketService
   */
  static onCallUpdated(fn) {
    return socket.on('call-updated', fn);
  }
}
