let pubkey = '82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2';

let relays = ['wss://relay.damus.io', 'wss://relay.nostr.band']

let counter = 0;

let pCounter = document.getElementById('counter');
let inputPubkey = document.getElementById('inputPubkey');
let ulCardList = document.getElementById('cardList');

inputPubkey.addEventListener('input', function() {
        pubkey = this.value;
        getFollower().catch(console.error);
});

async function getFollower() {
        ulCardList.innerHTML = '';
        counter = 0;
        pCounter.innerHTML = "Counter: " + counter;
        
        const pool = new NostrTools.SimplePool()

        let h = pool.subscribeMany(
                [...relays],
                [
                    {
                        kinds: [3],
                        '#p': [pubkey]
                        // authors: [pubkey]
                    },
                ],
                {
                    onevent(event) {
                        var date = new Date(event.created_at * 1000);

                        // console.log(event)
                        
                        counter++;
                        pCounter.innerHTML = "Counter: " + counter;
                        let li = document.createElement('li');
                        li.classList.add('list-group-item');
                        li.id = event.pubkey;
                        li.innerHTML = event.pubkey + " - " + date.toLocaleString();
                        ulCardList.appendChild(li);
                    },
                    oneose() {
                        h.close()
                    }
                }
            )
}

getFollower().catch(console.error);