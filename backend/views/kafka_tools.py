import json
from uuid import uuid4
from confluent_kafka import Consumer,TopicPartition,KafkaError,Producer
import json


configuration = {'bootstrap.servers': 'pkc-6ojv2.us-west4.gcp.confluent.cloud:9092',
                 'security.protocol': 'SASL_SSL', 
                 'sasl.mechanisms': 'PLAIN', 
                 'sasl.username': 'VNBARSTVVMNU5KSS', 
                 'sasl.password': 'C7ExbEED711pYtupHasTzo5sGjl6+/eZUxaXeOv+Ey5cWw6KeeF+tKywv/XDo85y', 
                 'enable.auto.commit': 'False', 
                 'session.timeout.ms': '45000',
                 }
kafka_topic_1 = 'topic_3'
kafka_topic_2 = 'topic_4'


def delivery_report(errmsg, msg):
 
	if errmsg is not None:
		print("Delivery failed for Message: {} : {}".format(msg.key(), errmsg))
		return
	print('Message: {} successfully produced to Topic: {} Partition: [{}] at offset {}'.format(
		msg.key(), msg.topic(), msg.partition(), msg.offset()))



def data_reader(action):

    props = configuration.copy()
    props["group.id"] = "python-group-1"
    props["auto.offset.reset"] = "latest"
    consumer = Consumer(props)
    topiv_partition = TopicPartition(kafka_topic_1, 0)
    low_d, high_d = consumer.get_watermark_offsets(topiv_partition)
    topiv_partition.offset = high_d-1
    consumer.assign([topiv_partition])
    consumer.subscribe([kafka_topic_1])
    msg = consumer.poll(1.0)

    if msg is None:
            print("Consumer None" )
            msg =msg
    if msg :
        if msg.error():
            print("ERROR : {}".format(msg.error()))
            msg =msg
        else:
            print("Data :",msg.value().decode('utf-8'))
            msg =msg.value().decode('utf-8')
            action(msg)

    print("consumer ended")

    return msg

def data_maker(data):
	# json_data = json.dumps(data)
	producer = Producer(configuration)
	producer.poll(0)

	try:
		producer.produce(topic=kafka_topic_1, key=str(uuid4()), value=data, on_delivery=delivery_report)
		producer.flush()
	except Exception as ex:
		print("ERROR :",ex)
	print("\n Stopping Kafka Producer")

