var dialplan;
var socket;

$(document).ready(function() {

    dialplan.get(render)
    socket = io("https://tele.event.dreamhack.se");

});

var render = function(dialplan) {

    dialplan = dialplan.phones;

    s = new sigma({
        renderer: {
            container: document.getElementById('graph-container'),
            type: 'webgl'
        },
        settings: {
            autoRescale: false,
            mouseEnabled: false,
            touchEnabled: false,
            defaultLabelSize: 10,
            defaultEdgeColor: '#FFFFFF',
            defaultNodeColor: '#FF6600',
            defaultLabelColor: '#FFFFFF',
            edgeColor: 'default',
            minArrowSize: 10,
            minEdgeSize: 1,
            maxEdgeSize: 30
        }
    });

    var nodes = dialplan.length;

    _.forEach(dialplan, function(n, key) {

        s.graph.addNode({
            id: String(n.extension),
            label: n.name.toUpperCase(),
            size: 10,
            x: (160 * Math.cos(Math.PI * 2 * key / nodes - Math.PI / 2))-20,
            y: 125 * Math.sin(Math.PI * 2 * key / nodes - Math.PI / 2),
            dX: 0,
            dY: 0,
            type: 'goo'
        });

    });


    socket.on('call', function(data) {
        console.log(data);
        s.graph.addEdge({
            source: String(data.source),
            target: String(data.target),
            id: String(data.id),
            type: "arrow",
            size: 7
        });

        s.refresh();
    });

    socket.on('hangup', function(data) {
        s.graph.dropEdge(data);
        s.refresh();

    });

    s.refresh();


}