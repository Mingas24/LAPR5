using MDV.Domain.Shared;

namespace MDV.Domain.Trips
{
    public class Node : IValueObject
    {
        public string node { get; private set; }
        public long passingTime { get; private set; }

        public Node() { }

        public Node(string node, long passingTime)
        {
            this.node = node;
            this.passingTime = passingTime;
        }
    }
}