(function() {

    if(window.location.href.includes(".xyz")){
        // Get HTML head element
        var head = document.getElementsByTagName('HEAD')[0];
        var body = document.getElementsByTagName('BODY')[0];

        // Create new link Element
        var css = document.createElement('link');
        // set the attributes for link element
        css.rel = 'stylesheet';
        css.type = 'text/css';
        css.href = 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/button.min.css';

        var sticky = document.createElement('link')
        sticky.rel = 'stylesheet';
        sticky.type = 'text/css';
        sticky.href = 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/sticky.min.css';

        var icons = document.createElement('link');
        icons.rel = 'stylesheet';
        icons.type = 'text/css';
        icons.href = 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/icon.min.css';

        var js = document.createElement('script')
        js.src = 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js'
        js.crossorigin = 'anonymous'
        js.referrerpolicy = 'no-referrer'

        var jq = document.createElement('script')
        jq.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'
        jq.crossorigin = 'anonymous'
        jq.referrerpolicy = 'no-referrer'

        // Append link element to HTML head
        head.appendChild(css);
        head.appendChild(icons);
        head.appendChild(sticky)
        head.appendChild(jq);
        head.appendChild(js);

        var root = document.getElementById('root')
        console.log(root)


        var doctitle = document.title
        var elem = document.getElementsByClassName('bg-basil h-24')[0]
        var a = document.createElement('a')
        var target = window.location.href
        a.target = '_blank'
        // API call to ML service
        // -- either product/business/protocol is seen
        // -- if seen fetch from DB
        // -- if not seen, add to DB
        a.href = 'http://localhost:4783/communities/0x023b-0x07?ref=' + target + "&title=" + doctitle
        a.innerHTML = '<div class="ui violet big launch right attached fixed button" style="z-index: 10000000;position: fixed;top: 25vh;"><i class="leaf icon"></i></div>'

        var ui_button = document.createElement('div')
        ui_button.className = 'ui violet big launch right attached fixed button'
        ui_button.style = 'z-index: 10000000;position: fixed;top: 25vh;'
        ui_button.innerHTML = '<i class="leaf icon"></i>'
        body.prepend(a)

    }

})();