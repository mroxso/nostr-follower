let pubkey = '82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2';

let relays = ['wss://relay.damus.io', 'wss://relay.nostr.band']

let counter = 0;

let pCounter = document.getElementById('counter');
let inputPubkey = document.getElementById('inputPubkey');
// pubkey = inputPubkey.value;

async function getFollower() {
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
            console.log(event)
            counter++;
            pCounter.innerHTML = "Counter: " + counter;
          },
          oneose() {
            h.close()
          }
        }
      )
}

getFollower().catch(console.error);