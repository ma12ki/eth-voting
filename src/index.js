domready(init);

let contractInstance;

function init() {
    const web3 = new Web3(new Web3.providers.HttpProvider(`http://localhost:${params.rpcPort}`));
    const contract = params.contract;

    const VotingContract = web3.eth.contract(contract.abi);

    contractInstance = VotingContract.at(contract.address);

    renderCandidates();
}

const renderCandidates = () => {
    const candidatesContainer = document.querySelector('#candidates');
    const candidates = params.candidates;

    candidates.forEach(name => {
        const node = document.createElement('div');
        node.setAttribute('id', name);
        node.className = 'candidate';
        node.onclick = () => voteForCandidate(node);

        const nameNode = renderName(name);
        const countNode = renderCount(name);

        node.appendChild(nameNode);
        node.appendChild(countNode);

        candidatesContainer.append(node);
    });
}

const renderName = name => {
    const node = document.createElement('div');
    node.className = 'name';
    const nameText = document.createTextNode(name);
    node.appendChild(nameText);

    return node;
};

const renderCount = name => {
    const count = contractInstance.totalVotesFor.call(name).toString();
    const node = document.createElement('div');
    node.className = 'count';
    const countText = document.createTextNode(count);
    node.appendChild(countText);

    return node;
};

const voteForCandidate = node => {
    const name = node.getAttribute('id');

    contractInstance.voteForCandidate(name, { from: params.account }, () => {
        updateVoteCount(node);
    });
};

const updateVoteCount = node => {
    const newCountNode = renderCount(node.getAttribute('id'));
    node.querySelector('.count').replaceWith(newCountNode);
};
