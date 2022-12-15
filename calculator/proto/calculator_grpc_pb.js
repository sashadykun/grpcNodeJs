// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var sum_pb = require('./sum_pb.js');
var primes_pb = require('./primes_pb.js');

function serialize_calculator_PrimesRequest(arg) {
  if (!(arg instanceof primes_pb.PrimesRequest)) {
    throw new Error('Expected argument of type calculator.PrimesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_PrimesRequest(buffer_arg) {
  return primes_pb.PrimesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_PrimesResponse(arg) {
  if (!(arg instanceof primes_pb.PrimesResponse)) {
    throw new Error('Expected argument of type calculator.PrimesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_PrimesResponse(buffer_arg) {
  return primes_pb.PrimesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SumRequest(arg) {
  if (!(arg instanceof sum_pb.SumRequest)) {
    throw new Error('Expected argument of type calculator.SumRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SumRequest(buffer_arg) {
  return sum_pb.SumRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SumResponse(arg) {
  if (!(arg instanceof sum_pb.SumResponse)) {
    throw new Error('Expected argument of type calculator.SumResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SumResponse(buffer_arg) {
  return sum_pb.SumResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CalculatorServiceService = exports.CalculatorServiceService = {
  sum: {
    path: '/calculator.CalculatorService/Sum',
    requestStream: false,
    responseStream: false,
    requestType: sum_pb.SumRequest,
    responseType: sum_pb.SumResponse,
    requestSerialize: serialize_calculator_SumRequest,
    requestDeserialize: deserialize_calculator_SumRequest,
    responseSerialize: serialize_calculator_SumResponse,
    responseDeserialize: deserialize_calculator_SumResponse,
  },
  primes: {
    path: '/calculator.CalculatorService/Primes',
    requestStream: false,
    responseStream: true,
    requestType: primes_pb.PrimesRequest,
    responseType: primes_pb.PrimesResponse,
    requestSerialize: serialize_calculator_PrimesRequest,
    requestDeserialize: deserialize_calculator_PrimesRequest,
    responseSerialize: serialize_calculator_PrimesResponse,
    responseDeserialize: deserialize_calculator_PrimesResponse,
  },
};

exports.CalculatorServiceClient = grpc.makeGenericClientConstructor(CalculatorServiceService);
