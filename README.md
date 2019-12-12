# sse-example

## Start

```sh
$ git clone
$ npm install
$ npm start
```

# Description

## Server-Sent Events

보통 Client에서 서버로 요청(Request)을 보내고 서버에서는 이에 대한 응답(Response)을 Client로 전달한다. 그런데 서버에서 Client로 Push 해야하는 경우에는 어떻게 해야할까?

많이 알려진 방법으로는 Polling 그리고 Long Polling이 있다. Client는 언제 서버에서 push가 올 지 알 수 없으므로 계속해서 request를 보내고 서버에서는 Push를 해야할 경우, 전달받은 request에 대한 response를 전달한다. 이 Polling 방식에 드는 비용이 너무 크기 때문에 요청하는 사이에 일정한 간격을 두고 request를 보내는 방식이 long polling이다.

그리고 WebSocket 방식이 있다. 최초에 connection을 연결한 다음, 그 connection을 기반으로 서버와 클라이언트가 통신하는 방식이다.

그리고 Server-Sent-Event 방식이 있다. EventSource라는 interface로 서버에서의 push를 받을 수 있는 API이다. 다음과 같은 특징을 같는다.

- EventSource 는 DOM event를 통해 서버로부터 push notification을 받을 수 있도록 한다.
- 마지막으로 전달된 메세지에 대해 응답이 끊겼을 경우, auto reconnection을 진행한다.
- `text/event-stream` 라는 content-type으로 응답이 전달된다.
- 스트림으로 전달되는 데이터는 `UTF-8` 로 인코딩되어 있어야 한다.

## Event Source vs WebSocket

WebSocket과 어떤 점이 다른지 파악한 뒤, 요구사항에 맞는 도구를 사용해야겠다.

### Popularity

- WebSocket 이 더 인기가 많은 이유는 예전에 브라우저 지원이 WebSocket이 더 많았기 때문이다.
- MS 브라우저들이 SSE를 지원하지 않는다. (IE, Edge)

### Directional

- SSE는 mono-directional로 client에서 데이터를 전달할 수 없다.
- 첫 connection establish 시점에 request를 보낸 후, 서버로부터 push를 받는다.
- WS는 full-duplex, bidirectional
    - ws는 socket 통신으로 양방향 통신이 가능하다.

### Support features

SSE에는 WebSocket에 설계 상 부족한 기능들이 포함되어 있다. 대표적으로 `automatic reconnection` 기능이 SSE에서 지원한다.

WS는 초기 establish 단계에서 HTTP 프로토콜로 진행되고 TCP handshaking 단계가 지나면 WS 프로토콜로 통신을 진행한다. SSE protocol 보다 좀 더 복잡하며 이것이 양방향 통신을 가능하게 한다. 그리고 이 부분 때문에 개발 시 신경써야 하는 부분이 더 많아진다.

SSE는 헤더만 신경쓰면서 HTTP 통신을 하면 된다.

```ts
const SSE_RESPONSE_HEADER = {
  'Connection': 'keep-alive',
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'X-Accel-Buffering': 'no'
};
```

SSE는 열 수 있는 connection에 제한이 있다. (ws은 없나 확인 필요?)
  - 브라우저 당 6개만 열 수 있다.

## From Server

```
data: [string]\n\n
event: [string] \n\n
```

stream 종료를 알리기 위해 response의 마지막은 항상 `\n\n` 으로 마무리해줘야 한다.

## References

- [HTML5 Server Sent Event Spec Document](https://html.spec.whatwg.org/multipage/server-sent-events.html)
- [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)
- [Can I use - Server Sent Event](https://caniuse.com/#feat=eventsource)
- [Browser APIs and Protocols: Server-Sent Events (SSE) - High Performance Browser Networking (O'Reilly)](https://hpbn.co/server-sent-events-sse/)
- [launchdarkly/js-eventsource](https://github.com/launchdarkly/js-eventsource)
- [Stream Updates with Server-Sent Events - HTML5 Rocks](https://www.html5rocks.com/en/tutorials/eventsource/basics/)
- [Scaledrone realtime messaging service - Blog](https://www.scaledrone.com/blog/websockets-vs-server-sent-events-sses/)
- [EventSource/eventsource](https://github.com/EventSource/eventsource/blob/master/lib/eventsource.js)
- [Server-Sent Events in Spring | Baeldung](https://www.baeldung.com/spring-server-sent-events)